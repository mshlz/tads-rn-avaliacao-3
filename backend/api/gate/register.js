import axios from "axios";
import { ulid } from "ulid";
import { admin, firestore } from "../../../utils/firebase";
import {
  ACCESS_TOKEN,
  GATE_COLLECTION_NAME,
  getData,
} from "../../../utils/gate";

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  // if (req.headers.authorization !== ACCESS_TOKEN) {
  //   return res.status(401).json({ message: "not authorized" });
  // }

  const data = getData(req);
  const id = ulid();
  const { docs } = await firestore
    .collection(GATE_COLLECTION_NAME + "/subs/entries")
    .get();

  await axios.post(
    "https://api.expo.dev/v2/push/send",
    docs
      .filter((v) => v.id.startsWith("ExponentPushToken"))
      .map((v) => ({
        to: v.id,
        title: "GateSys - HLZ",
        body: `Portão foi ${data.type == "OPEN" ? "aberto" : "fechado"}`,
      }))
  );

  return firestore
    .collection(GATE_COLLECTION_NAME)
    .doc(id)
    .set({
      id: id,
      type: data.type == "OPEN" ? "OPEN" : "CLOSE",
    })
    .then(() => {
      return res
        .status(200)
        .json({ success: true, message: "register success " + (data.type == "OPEN" ? "OPEN" : "CLOSE") });
    })
    .catch((error) => {
      return res.status(200).json({ success: false, message: error.message });
    });
}
