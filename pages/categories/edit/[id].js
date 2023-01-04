import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import CategoryForm from '../../../components/categories/CategoryForm';
import { getCategory } from '../../../utils/data/categoryData';

export default function EditCategory() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    getCategory(id).then(setEditItem);
  }, [id]);

  return (
    <div className="edit-form" style={{ height: '45rem', padding: '10%' }}>
      <CategoryForm categoryObj={editItem} />
    </div>
  );
}
