import { firestore } from "../../../utils/firebase";
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
  let query = firestore
    .collection(GATE_COLLECTION_NAME)
    .orderBy("id", "desc")
    .limit(100);

  if (data.next) {
    query = query.startAfter(data.next);
  }

  query
    .get()
    .then((value) => {
      return res.status(200).json({
        success: true,
        message: "success",
        data: value.docs.map((v) => v.data()),
        size: value.size,
      });
    })
    .catch((error) => {
      return res.status(200).json({ success: false, message: error.message });
    });
}
