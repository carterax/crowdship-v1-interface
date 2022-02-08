import Link from 'next/link';
import { useState } from 'react';

import {
  ViewerQuery,
  useViewerQuery,
  ViewerDocument,
} from '@/lib/graphql/types/user/queries.graphql';
import { useUpdateNameMutation } from '@/lib/graphql/types/user/mutations.graphql';
import { initializeApollo } from '@/lib/graphql/apollo';

const Test = () => {
  const { viewer } = useViewerQuery().data!;
  const [newName, setNewName] = useState('');
  const [updateNameMutation] = useUpdateNameMutation();

  const onChangeName = () => {
    updateNameMutation({
      variables: {
        name: newName,
      },
      //Follow apollo suggestion to update cache
      //https://www.apollographql.com/docs/angular/features/cache-updates/#update
      update: (cache, mutationResult) => {
        const { data } = mutationResult;
        if (!data) return; // Cancel updating name in cache if no data is returned from mutation.
        // Read the data from our cache for this query.
        const { viewer } = cache.readQuery({
          query: ViewerDocument,
        }) as ViewerQuery;
        const newViewer = { ...viewer };
        // Add our comment from the mutation to the end.
        newViewer.name = data.updateName.name;
        // Write our data back to the cache.
        cache.writeQuery({
          query: ViewerDocument,
          data: { viewer: newViewer },
        });
      },
    });
  };

  return (
    <div style={{ paddingTop: '120px' }}>
      Youre signed in as {viewer.name} and youre {viewer.status}. Go to the{' '}
      <Link href='/about'>
        <a>about</a>
      </Link>{' '}
      page.
      <div>
        <input
          type='text'
          placeholder='your new name...'
          onChange={(e) => setNewName(e.target.value)}
        />
        <input type='button' value='change' onClick={onChangeName} />
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ViewerDocument,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default Test;
