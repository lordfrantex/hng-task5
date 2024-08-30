export const determineColor = (name: string) => {
    let color = ''

    switch (true) {
        case name.toLocaleLowerCase().includes('facebook'):
            color = '#1877F2';
            break;
        case name.toLocaleLowerCase().includes('github'):
            color = '#171515';
            break;
        case name.toLocaleLowerCase().includes('twitter'):
            color = '#1DA1F2';
            break;
        case name.toLocaleLowerCase().includes('instagram'):
            color = '#E1306C';
            break;
        case name.toLocaleLowerCase().includes('linkedin'):
            color = '#0A66C2';
            break;
        case name.toLocaleLowerCase().includes('pinterest'):
            color = '#E60023';
            break;
        case name.toLocaleLowerCase().includes('snapchat'):
            color = '#FFFC00';
            break;
        case name.toLocaleLowerCase().includes('tiktok'):
            color = '#010101';
            break;
        case name.toLocaleLowerCase().includes('youtube'):
            color = '#FF0000';
            break;
        case name.toLocaleLowerCase().includes('whatsapp'):
            color = '#25D366';
            break;
        case name.toLocaleLowerCase().includes('reddit'):
            color = '#FF4500';
            break;
        case name.toLocaleLowerCase().includes('dev.to'):
            color = '#0A0A0A';
            break;
        case name.toLocaleLowerCase().includes('twitch'):
            color = '#9146FF';
            break;
        case name.toLocaleLowerCase().includes('stack overflow'):
            color = '#F58025';
            break;
        case name.toLocaleLowerCase().includes('codewars'):
            color = '#AD2C27';
            break;
        case name.toLocaleLowerCase().includes('hashnode'):
            color = '#2962FF';
            break;
        case name.toLocaleLowerCase().includes('codepen'):
            color = '#000000';
            break;
        case name.toLocaleLowerCase().includes('frontend mentor'):
            color = '#3F54A3';
            break;
        case name.toLocaleLowerCase().includes('gitlab'):
            color = '#FC6D26';
            break;
        case name.toLocaleLowerCase().includes('freecodecamp'):
            color = '#006400';
            break;
        default:
            color = 'white';
            break;
    }
    return color
}