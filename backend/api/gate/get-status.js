import { firestore } from "../../../utils/firebase";
import { ACCESS_TOKEN, GATE_COLLECTION_NAME } from "../../../utils/gate";

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  // if (req.headers.authorization !== ACCESS_TOKEN) {
  //   return res.status(401).json({ message: "not authorized" });
  // }

  firestore
    .collection(GATE_COLLECTION_NAME)
    .orderBy("id", "desc")
    .limit(1)
    .get()
    .then((value) => {
      if (value.empty) {
        return res

          .status(200)
          .json({ success: false, message: "no entries found" });
      } else {
        return res.status(200).json({
          success: true,
          message: "success",
          data: value.docs.map((v) => v.data()),
        });
      }
    })
    .catch((error) => {
      return res.status(200).json({ success: false, message: error.message });
    });
}
