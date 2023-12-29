import React, { useLayoutEffect } from "react";
import { Flex, Text, useTheme } from "@chakra-ui/react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Material from "@amcharts/amcharts5/themes/Material";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";

const ChartComponent = ({ chartId, title, data, chartType }) => {
    const theme = useTheme();

    useLayoutEffect(() => {
        let root = am5.Root.new(chartId);
        am5.ready(function () {
            root.setThemes([
                am5themes_Animated.new(root),
                am5themes_Responsive.new(root),
                am5themes_Material.new(root),
            ]);

            let chart, series, xAxis, yAxis, label, legend;

            switch (chartType) {
                case "donut":
                    root._logo.dispose();
                    chart = root.container.children.push(
                        am5percent.PieChart.new(root, {
                            layout: root.horizontalLayout,
                            innerRadius: am5.percent(45),
                        })
                    );
                    series = chart.series.push(
                        am5percent.PieSeries.new(root, {
                            name: "Series",
                            categoryField: "category",
                            valueField: "count",
                            legendLabelText: "[]{category}[/]",
                            legendValueText: "\n[bold fontSize:18px]{count}[/]",
                        })
                    );
                    series.animate({
                        key: "startAngle",
                        to: 180,
                        loops: 1,
                        duration: 2000,
                        easing: am5.ease.yoyo(am5.ease.cubic),
                    });
                    label = series.children.push(
                        am5.Label.new(root, {
                            html: "<h6>Total</h6><h4>{valueSum.formatNumber('#,###.')}</h4>",
                            fontSize: 14,
                            centerX: am5.percent(50),
                            centerY: am5.percent(50),
                            populateText: true,
                        })
                    );
                    series.data.setAll(data);

                    break;
                default:
                    chart = root.container.children.push(
                        am5xy.XYChart.new(root, {
                            panY: false,
                            layout: root.verticalLayout,
                        })
                    );
                    xAxis = chart.xAxes.push(
                        am5xy.CategoryAxis.new(root, {
                            categoryField: "month",
                            renderer: am5xy.AxisRendererX.new(root, {
                                cellStartLocation: 0.1,
                                cellEndLocation: 0.9,
                            }),
                            tooltip: am5.Tooltip.new(root, {}),
                        })
                    );

                    xAxis.data.setAll(data);

                    yAxis = chart.yAxes.push(
                        am5xy.ValueAxis.new(root, {
                            autoZoom: false,
                            renderer: am5xy.AxisRendererY.new(root, {}),
                        })
                    );

                    series = chart.series.push(
                        am5xy.ColumnSeries.new(root, {
                            name: "Transactions",
                            xAxis: xAxis,
                            yAxis: yAxis,
                            valueYField: "transactions",
                            categoryXField: "month",
                            stacked: true,
                            sequencedInterpolation: true,
                            sequencedDelay: 100,
                        })
                    );

                    series.data.setAll(data);
                    series.columns.template.setAll({
                        focusable: true,
                        ariaLabel:
                            "Series: {name}. Transactions: {valueY}. Month: {categoryX}",
                        role: "figure",
                        hoverOnFocus: true,
                        tooltipText: "[bold]{name}[/]\n{categoryX}: {valueY}",
                        tooltipY: 0,
                    });
                    series.appear();
                    // Add legend
                    legend = chart.children.push(
                        am5.Legend.new(root, {
                            centerX: am5.p50,
                            x: am5.p50,
                        })
                    );
                    legend.data.push(series);
            }

            chart.appear(1000, 100);
        });

        return () => {
            root.dispose();
        };
    }, [data, chartType, theme, chartId]);

    return (
        <Flex
            direction="column"
            bg={theme.colors.gray[100]}
            borderRadius="lg"
            boxShadow="md"
            p={4}
            h="300px"
        >
            <Text fontSize="lg" fontWeight="bold" mb={4}>
                {title}
            </Text>
            <Flex id={chartId} w="100%" h="100%" />
        </Flex>
    );
};

export default ChartComponent;
