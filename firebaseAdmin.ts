import { getApps } from "firebase/app";
var admin = require("firebase-admin");

var serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);


if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  // console.log('apps', getApps())
}

const adminDB = admin.firestore()

export { adminDB };
