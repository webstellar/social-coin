export const shareOnLinkedIn = () => {
    const URL = `https://www.linkedin.com/sharing/share-offsite/?url=${document.URL}`;
    window.open(URL, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');   
}
