import { firestore } from 'firebase-admin';

import { TAGS } from '../../constants';
import { DESC } from '../../constants/query';
import { Tag } from '../../interfaces/tag';

export const getTags = async ({ limit }): Promise<Tag[]> => {
  const tagsRef = firestore().collection(TAGS);
  const ref = tagsRef.orderBy('createdAt', DESC).limit(limit);

  const snapshots = await ref.get();

  return snapshots.docs.map((snapshot) => {
    const data = snapshot.data();

    return { ...data, id: snapshot.id } as Tag;
  });
};
