const { firestore } = require('firebase-admin')

const { createTasks } = require('../libs/createTasks')

module.exports = async (allPosts) => {
  const posts = allPosts.filter((post) => post.ownerId)

  const tasks = createTasks(posts)

  const store = firestore()

  const promises = tasks.map((task) => {
    const posts = task

    const batch = store.batch()

    posts.forEach((post) => {
      const userRef = store.collection('users').doc(post.ownerId)
      const ref = userRef.collection('posts').doc(post.id)

      batch.set(ref, post)
    })

    return batch.commit()
  })

  console.time('writeUserPosts')

  await Promise.all(promises)

  console.timeEnd('writeUserPosts')
}
