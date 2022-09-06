import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { Button } from "../../components/Button";
import GateService from "../../services/GateService";
import dayjs from "dayjs";
import { decodeTime } from "ulid";

export const ListarScreen = () => {
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    setLoading(true);
    GateService.getList()
      .then((result) => {
        setEntries(result.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const Item = ({ id, type }) => (
    <View style={{ padding: 10, borderBottomWidth: 1 }}>
      <Text style={{ fontSize: 10 }}>{id}</Text>
      <Text>
        {dayjs(decodeTime(id)).format("DD/MM/YY HH:mm:ss")} - {type}
      </Text>
    </View>
  );

  const renderItem = ({ item }) => <Item type={item.type} id={item.id} />;

  return (
    <SafeAreaView>
      <Button
        text="Refresh"
        onPress={() => fetchEntries()}
        disabled={loading}
      />
      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={() => {
          fetchEntries();
        }}
      />
    </SafeAreaView>
  );
};
