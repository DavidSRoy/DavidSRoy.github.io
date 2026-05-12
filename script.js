const PREVIEW_PARA_LIMIT = 4;
const PREVIEW_CHAR_LIMIT = 400;

async function loadPosts() {
    const section = document.querySelector('.writing');
    const files = await fetch('posts/index.json').then(r => r.json());

    for (let i = 0; i < files.length; i++) {
        const text = await fetch(`posts/${files[i]}`).then(r => r.text());
        const { meta, body } = parseFrontmatter(text);
        const article = buildArticle(meta, body, `post-${i + 1}`);
        section.appendChild(article);
        initPost(article);
    }
}

function parseFrontmatter(text) {
    const match = text.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n([\s\S]*)$/);
    if (!match) return { meta: {}, body: text };
    const meta = {};
    match[1].split('\n').forEach(line => {
        const colon = line.indexOf(':');
        if (colon > 0) meta[line.slice(0, colon).trim()] = line.slice(colon + 1).trim();
    });
    return { meta, body: match[2] };
}

function buildArticle(meta, body, id) {
    const article = document.createElement('article');
    article.className = 'post';
    article.id = id;
    const metaParts = [meta.category, meta.date && meta.date.replace(/-/g, '.')].filter(Boolean);
    article.innerHTML = `
        <h3>${meta.title || ''}</h3>
        <div class="meta">${metaParts.join(' · ')}</div>
        <div class="content">${marked.parse(body)}</div>
        <div class="actions">
            <button class="more-btn">More</button>
            <button class="share-btn">Share</button>
        </div>
    `;
    return article;
}

function initPost(post) {
    const content = post.querySelector('.content');
    const moreBtn = post.querySelector('.more-btn');
    const shareBtn = post.querySelector('.share-btn');
    const paragraphs = content.querySelectorAll('p');

    let totalChars = 0;
    paragraphs.forEach(p => totalChars += p.textContent.length);

    const needsTruncate = paragraphs.length > PREVIEW_PARA_LIMIT || totalChars > PREVIEW_CHAR_LIMIT;

    if (needsTruncate) {
        content.classList.add('truncated');
        moreBtn.style.display = 'inline';
    } else {
        moreBtn.style.display = 'none';
    }

    moreBtn.addEventListener('click', () => {
        content.classList.toggle('truncated');
        moreBtn.textContent = content.classList.contains('truncated') ? 'More' : 'Less';
    });

    shareBtn.addEventListener('click', () => {
        const url = `${window.location.origin}${window.location.pathname}#${post.id}`;
        navigator.clipboard.writeText(url).then(() => {
            const orig = shareBtn.textContent;
            shareBtn.textContent = 'Link copied';
            setTimeout(() => shareBtn.textContent = orig, 1500);
        });
    });
}

loadPosts();
