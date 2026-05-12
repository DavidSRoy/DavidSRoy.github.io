const PREVIEW_CHAR_LIMIT = 400;
const PREVIEW_PARA_LIMIT = 4;

document.querySelectorAll('.post').forEach(post => {
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
            const originalText = shareBtn.textContent;
            shareBtn.textContent = 'Link copied';
            setTimeout(() => shareBtn.textContent = originalText, 1500);
        });
    });
});
