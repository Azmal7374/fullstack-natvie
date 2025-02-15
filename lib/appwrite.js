import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.aoras",
  projectId: "67af09e3002a2a64aeba",
  databaseId: "67af0d040005f73f7f8e",
  userCollectionId: "67af0d39000a5c207765",
  videoCollectionId: "67af0d79002aa4e7cb75",
  storageId: "67af103a002d9e04aff0",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const storage = new Storage(client)
const avatars = new Avatars(client);
const databases = new Databases(client);


//register users
export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw new Error("Account creation failed");

    const avatarUrl = avatars.getInitials(username);
    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountid: newAccount.$id,  // Make sure the field name is exactly as in the schema
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log("Error during user creation:", error);
    throw new Error(error.message);
  }
};




export const  signIn = async(email, password)=> {
    try {
      const session = await account.createEmailPasswordSession(email, password);
  
      return session;
    } catch (error) {
      throw new Error(error);
    }
  }

// Register User
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountid", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}


export const getAllPosts = async ()=>{
  try{
   const posts = await databases.listDocuments(
    config.databaseId,
    config.videoCollectionId
   )
   return posts.documents;
  }catch(error){
    throw new Error(error);
  }
}

export const getLatestPosts = async ()=>{
  try{
   const posts = await databases.listDocuments(
    config.databaseId,
    config.videoCollectionId,
    [Query.orderDesc("$createdAt"), Query.limit(7)]
   )
   return posts.documents;
  }catch(error){
    throw new Error(error);
  }
}


export const searchPosts = async ()=>{
  try{
   const posts = await databases.listDocuments(
    config.databaseId,
    config.videoCollectionId,
    [Query.search("title", Query)]
   )
   return posts.documents;
  }catch(error){
    throw new Error(error);
  }
}