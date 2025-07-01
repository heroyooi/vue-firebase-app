import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { storage } from './firebase';

export const uploadImage = async (file) => {
  const fileRef = ref(storage, `images/${Date.now()}_${file.name}`);
  await uploadBytes(fileRef, file);
  return getDownloadURL(fileRef);
};

export const deleteImage = async (url) => {
  const path = decodeURIComponent(url.split('/o/')[1].split('?')[0]);
  const fileRef = ref(storage, path);
  await deleteObject(fileRef);
};
