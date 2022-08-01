export const shareOnLinkedIn = () => {
    const URL = `https://www.linkedin.com/sharing/share-offsite/?url=${document.URL}`;
    window.open(URL, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');   
}

export const shareOnFacebook = () => {
    const URL = `https://www.facebook.com/sharer/sharer.php?u=${document.URL}&hashtag=%23socialcoin`;
    window.open(URL, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
}
