import * as SecureStore from "expo-secure-store";

type Signup = {
  email: string;
  password: string;
};

export const save = async (key: string, item: Signup) => {
  try {
    const jsonValue = JSON.stringify(item);
    await SecureStore.setItemAsync(key, jsonValue);
  } catch (e) {
    console.error(e);
  }
};

export const get = async (key: string): Promise<Signup | undefined> => {
  try {
    const result = await SecureStore.getItemAsync(key);
    if (result === null) {
      return undefined;
    } else {
      return JSON.parse(result);
    }
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export const saveImg = async (key: string, item: string[] | string) => {
  try {
    const existingImages = (await get(key)) || [];
    const newImages = [existingImages, ...item];
    const jsonValue = JSON.stringify(newImages);
    await SecureStore.setItemAsync(key, jsonValue);
  } catch (e) {
    console.error(e);
  }
};
