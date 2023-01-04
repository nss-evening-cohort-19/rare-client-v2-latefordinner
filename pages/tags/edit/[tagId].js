import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import TagForm from '../../../components/TagForm';
import { getTagById } from '../../../utils/tagData';

export default function EditTag() {
  const [editTag, setEditTag] = useState({});
  const router = useRouter();
  const { tagId } = router.query;
  useEffect(() => {
    getTagById(tagId).then(setEditTag);
  }, [tagId]);
  return (<TagForm object={editTag} />);
}
