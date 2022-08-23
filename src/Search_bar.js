import React, { Component } from "react";
import {
    View,
    Platform,
    FlatList,
    StatusBar,
    UIManager,
    SafeAreaView,
    LayoutAnimation
} from "react-native";
import { LineChart } from "react-native-svg-charts";
import SearchBar from "react-native-dynamic-search-bar";
import GradientCard from "react-native-gradient-card-view";
import { ScreenWidth } from "@freakycoder/react-native-helpers";
import { CustomLayoutSpring } from "react-native-animation-layout";
let staticData = [
    {
        id:1,
        name: "Bitcoin",
        shortName: "BTC",
        value: "$ 4081,95",
        change: "+ 1,48 ↑",
        fillColor: "rgba(163, 224, 97, 0.2)",
        strokeColor: "rgba(163, 224, 97, 1.0)",
        image: require("./assets/images/oumaima.png"),
        data: [
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10
        ]
    },
    {
        id:2,
        name: "Ethereum",
        shortName: "ETH",
        value: "$ 141.39",
        change: "+ 0,59 ↓",
        fillColor: "rgba(234, 53, 53, 0.2)",
        strokeColor: "rgba(234, 53, 53, 1.0)",
        image: require("./assets/images/oumaima.png"),
        data: [
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10
        ]
    },
    {
        id:3,
        name: "Litecoin",
        shortName: "BCH",
        value: "$ 1535.39",
        change: "+ 1,51 ↓",
        fillColor: "rgba(234, 53, 53, 0.2)",
        strokeColor: "rgba(234, 53, 53, 1.0)",
        image: require("./assets/images/oumaima.png"),
        data: [
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10
        ]
    },
    {
        id:4,
        name: "Ripple",
        shortName: "XRP",
        value: "$ 4081,95",
        change: "+ 1,48 ↑",
        fillColor: "rgba(163, 224, 97, 0.2)",
        strokeColor: "rgba(163, 224, 97, 1.0)",
        image: require("./assets/images/oumaima.png"),
        data: [
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10
        ]
    },
    {
        id:5,
        name: "Dash",
        shortName: "DSH",
        value: "$ 141.39",
        change: "+ 0,59 ↓",
        fillColor: "rgba(234, 53, 53, 0.2)",
        strokeColor: "rgba(234, 53, 53, 1.0)",
        image: require("./assets/images/oumaima.png"),
        data: [
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10
        ]
    },
    {
        id:6,
        name: "Iota",
        shortName: "MIOTA",
        value: "$ 141.39",
        change: "+ 0,59 ↓",
        fillColor: "rgba(234, 53, 53, 0.2)",
        strokeColor: "rgba(234, 53, 53, 1.0)",
        image: require("./assets/images/oumaima.png"),
        data: [
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10
        ]
    },
    {
        id:7,
        name: "Eos",
        shortName: "EOS",
        value: "$ 4081,95",
        change: "+ 1,48 ↑",
        fillColor: "rgba(163, 224, 97, 0.2)",
        strokeColor: "rgba(163, 224, 97, 1.0)",
        image: require("./assets/images/oumaima.png"),
        data: [
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10
        ]
    },
    {
        id:8,
        name: "Neo",
        shortName: "NEO",
        value: "$ 141.39",
        change: "+ 0,59 ↓",
        fillColor: "rgba(234, 53, 53, 0.2)",
        strokeColor: "rgba(234, 53, 53, 1.0)",
        image: require("./assets/images/oumaima.png"),
        data: [
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10
        ]
    },
    {
        id:9,
        name: "Neo",
        shortName: "NEO",
        value: "$ 141.39",
        change: "+ 0,59 ↓",
        fillColor: "rgba(234, 53, 53, 0.2)",
        strokeColor: "rgba(234, 53, 53, 1.0)",
        image: require("./assets/images/oumaima.png"),
        data: [
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10
        ]
    },
    {
        id:10,
        name: "Neo",
        shortName: "NEO",
        value: "$ 141.39",
        change: "+ 0,59 ↓",
        fillColor: "rgba(234, 53, 53, 0.2)",
        strokeColor: "rgba(234, 53, 53, 1.0)",
        image: require("./assets/images/oumaima.png"),
        data: [
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10
        ]
    },
    {
        id:11,
        name: "Neo",
        shortName: "NEO",
        value: "$ 141.39",
        change: "+ 0,59 ↓",
        fillColor: "rgba(234, 53, 53, 0.2)",
        strokeColor: "rgba(234, 53, 53, 1.0)",
        image: require("./assets/images/oumaima.png"),
        data: [
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10
        ]
    },
    {
        id:12,
        name: "Neo",
        shortName: "NEO",
        value: "$ 141.39",
        change: "+ 0,59 ↓",
        fillColor: "rgba(234, 53, 53, 0.2)",
        strokeColor: "rgba(234, 53, 53, 1.0)",
        image: require("./assets/images/oumaima.png"),
        data: [
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10
        ]
    },
    {
        id:13,
        name: "Neo",
        shortName: "NEO",
        value: "$ 141.39",
        change: "+ 0,59 ↓",
        fillColor: "rgba(234, 53, 53, 0.2)",
        strokeColor: "rgba(234, 53, 53, 1.0)",
        image: require("./assets/images/oumaima.png"),
        data: [
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10
        ]
    },
    {
        id:14,
        name: "Neo",
        shortName: "NEO",
        value: "$ 141.39",
        change: "+ 0,59 ↓",
        fillColor: "rgba(234, 53, 53, 0.2)",
        strokeColor: "rgba(234, 53, 53, 1.0)",
        image: require("./assets/images/oumaima.png"),
        data: [
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10
        ]
    },
    {
        id:15,
        name: "Neo",
        shortName: "NEO",
        value: "$ 141.39",
        change: "+ 0,59 ↓",
        fillColor: "rgba(234, 53, 53, 0.2)",
        strokeColor: "rgba(234, 53, 53, 1.0)",
        image: require("./assets/images/oumaima.png"),
        data: [
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10
        ]
    }
];
import styles, { centerSubtitleStyle } from "./Styles";

export default class Search_bar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            seed: 1,
            query: "",
            isLoading: true,
            refreshing: false,
            dataBackup: staticData,
            dataSource: staticData,
            visible:false,
        };
        if (Platform.OS === "android") {
            UIManager.setLayoutAnimationEnabledExperimental &&
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    filterList = text => {
        let newData = this.state.dataBackup.filter(item => {
            const itemData = item.name.toLowerCase();
            const textData = text.toLowerCase();
            return itemData.indexOf(textData) > -1;
        });
        LayoutAnimation.configureNext(CustomLayoutSpring(null, null, "scaleXY"));
        this.setState({
            query: text,
            dataSource: newData
        });
    };

    renderRightComponent = item => (
        <View>
            <LineChart
                data={item.data}
                style={styles.chartStyle}
                contentInset={styles.chartContentInset}
                svg={{
                    strokeWidth: 1.5,
                    fill: item.fillColor,
                    stroke: item.strokeColor
                }}
            />
        </View>
    );

    renderItem(item) {
        return (
            <GradientCard
                key={item.id}
                title={item.name}
                style={styles.cardStyle}
                imageSource={item.image}
                centerTitle={item.value}
                subtitle={item.shortName}
                width={ScreenWidth * 0.9}
                centerSubtitle={item.change}
                shadowStyle={styles.cardShadowStyle}
                centerSubtitleStyle={centerSubtitleStyle(item)}
                rightComponent={this.renderRightComponent(item)}
            />
        );
    }

    onRefresh = () => {
        this.setState({
            dataSource: [],
            isLoading: false,
            refreshing: true,
            seed: 1,
            page: 1
        });
        // this.fetchData();
    };

    loadMore = () => {
        this.setState({
            // refreshing: true,
            page: this.state.page + 1
        });
        // this.fetchData();
    };

    render() {
        return (
            <SafeAreaView style={styles.safeAreaViewStyle}>
                <StatusBar barStyle={"light-content"} />
                <View style={styles.container}>
                    <SearchBar
                        onPressToFocus
                        autoFocus={false}
                        fontColor="#c6c6c6"
                        iconColor="#c6c6c6"
                        shadowColor="#282828"
                        cancelIconColor="#c6c6c6"
                        backgroundColor="#353d5e"
                        placeholder="Search "
                        onChangeText={text => {
                            this.setState({visible:true});
                            this.filterList(text);
                        }}
                        onPressCancel={() => {
                            this.filterList("");
                            this.setState({visible:false});
                        }}
                        onPress={() => alert("onPress")}
                        onKeyPress={() => alert("onKeyPress")}
                    />
                    {this.state.visible===true ?
                        <View style={styles.flatListStyle}>
                            <FlatList
                                onRefresh={this.onRefresh}
                                data={this.state.dataSource}
                                onEndReached={this.loadMore}
                                refreshing={this.state.refreshing}
                                renderItem={({ item }) => this.renderItem(item)}
                            />
                        </View>:null

                    }

                </View>
            </SafeAreaView>
        );
    }
}
