import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Table } from 'react-bootstrap';
import { deleteTag, getTags } from '../../utils/tagData';
import TagForm from '../../components/TagForm';

function TagsPage() {
  const [tags, setTags] = useState([]);

  const getAllTags = () => {
    getTags().then(setTags);
  };

  useEffect(() => {
    getAllTags();
  }, []);

  const refresh = () => getAllTags();

  return (
    <>
      <TagForm refresh={refresh} />
      <h2>Tags</h2>
      <Table striped bordered hover>
        <tbody>
          {
            tags?.map((tag) => (
              <tr key={tag.id}>
                <td>
                  <Link href={`/tags/edit/${tag.id}`} passHref>
                    <Button size="sm" variant="dark">
                      EDIT
                    </Button>
                  </Link>
                  <Button size="sm" variant="danger" onClick={() => deleteTag(tag.id).then(() => getAllTags())}>Delete</Button>
                </td>
                <td>{tag.label}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </>
  );
}

export default TagsPage;
