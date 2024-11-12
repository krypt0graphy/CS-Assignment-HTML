
const firebaseConfig = {
    apiKey: "AIzaSyC2bSxVO_I8G6QlzAchO-DcKowJ34OR1zY",
    authDomain: "cs-assignment-html.firebaseapp.com",
    databaseURL: "https://cs-assignment-html-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "cs-assignment-html",
    storageBucket: "cs-assignment-html.firebasestorage.app",
    messagingSenderId: "299402093754",
    appId: "1:299402093754:web:1b13f0245267c5a8164e83"
};

firebase.initializeApp(firebaseConfig);
console.log("Firebase initialized:", firebase.apps.length > 0);
const db = firebase.firestore();

async function getLatestPosts() {

    try {
        const querySnapshot = await db.collection('Blogposts')
            .orderBy('date', 'desc')
            .limit(3)
            .get();

        console.log("Documents fetched:", querySnapshot.size);
        const posts = querySnapshot.docs.map(doc => doc.data());

        console.log("Fetched Posts:", posts); // Debugging: Check the posts array

        posts.forEach((post, index) => {
            console.log(`Post ${index + 1}:`, post);  // Log post data
            console.log("Index:", index); // Log the index to confirm it's working

            const imgElem = document.getElementById(`post-image-${index + 1}`);
            const titleElem = document.getElementById(`post-title-${index + 1}`);
            const dateElem = document.getElementById(`post-date-${index + 1}`);

            console.log("Image Element:", imgElem);
            console.log("Title Element:", titleElem);
            console.log("Date Element:", dateElem);

            if (imgElem) imgElem.src = post.image || 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/1022px-Placeholder_view_vector.svg.png?20220519031949';
            if (titleElem) titleElem.textContent = post.title || 'No Title';
            if (dateElem) dateElem.textContent = post.date.toDate().toLocaleDateString()|| 'No Date';
        });
    } catch (error) {
        console.error("Error fetching posts: ", error);
    }

}


async function populateList() {
    try {
        const querySnapshot = await db.collection('Blogposts')
            .orderBy('date', 'desc')
            .get();

        const postList = document.getElementById('posts-list')

        querySnapshot.forEach((doc) => {
            const post = doc.data();
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            const postTitle = document.createElement('span')
            const postDate = document.createElement('span')

            postTitle.textContent = post.title;
            postDate.textContent = post.date.toDate().toLocaleDateString();
            postTitle.classList.add('post-title');
            postDate.classList.add('post-date');

            link.href = "#";
            link.setAttribute('data-id', post.id);
            link.addEventListener('click', (e) => {
                e.preventDefault();
                if (document.getElementById('post-image')) {
                    document.getElementById('post-image').remove();
                }

                displayPostById(post.id);
            });

            link.appendChild(postTitle);
            link.appendChild(document.createElement('br'))
            link.appendChild(postDate)
            listItem.appendChild(link);
            postList.appendChild(listItem)

        });
    } catch (error) {
        console.error('Error populating list', error)
    }

}

async function displayPostById(postId) {
    console.log(postId)
    try {
        const selectedPost = await db.collection('Blogposts')
            .where('id', '==', postId)  // Match the 'id' field in the document
            .get();
        const doc = selectedPost.docs[0];

        if (!selectedPost.empty) {
            post = doc.data();

            document.getElementById('post-title').textContent = post.title || 'No Title';
            document.getElementById('post-date').textContent = post.date ? post.date.toDate().toLocaleDateString() : 'No Date';
            document.getElementById('content').textContent = post.content || 'No Content Available';
            const selectedPostDiv = document.getElementById('selected-post');

            if (post.image) {
                const imgElem = document.createElement('img');
                imgElem.id = 'post-image';
                imgElem.src = post.image;
                selectedPostDiv.appendChild(imgElem)
            }

            selectedPostDiv.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.log('No post found!')
        }

    } catch (error) {
        console.error("Error fetching post by ID:", error);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.getAttribute('data-page')
    if (page == 'posts') {
        populateList()
    }
    if (page == 'index') {
        getLatestPosts();
    }
});