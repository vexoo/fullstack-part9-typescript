import axios from 'axios';
import { DiaryEntry, DiaryFormValues } from '../types';

const apiBaseUrl = 'http://localhost:3001/api';

const getAll = async () => {
  const { data } = await axios.get<DiaryEntry[]>(`${apiBaseUrl}/diaries`);

  return data;
};

const create = async (object: DiaryFormValues) => {
  const { data } = await axios.post<DiaryEntry>(
    `${apiBaseUrl}/diaries`,
    object
  );

  return data;
};

export default {
  getAll,
  create
};
