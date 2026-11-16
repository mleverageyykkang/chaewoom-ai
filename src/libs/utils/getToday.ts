/** 오늘 날짜를 “YYYY-MM-DD” 형식으로 반환 */
export function getToday(): string {
    const today = new Date();
    return formatDate(today);
}

/** 어제 날짜를 “YYYY-MM-DD” 형식으로 반환 */
export function getYesterday(): string {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return formatDate(yesterday);
}

/** 그제(전전날) 날짜를 “YYYY-MM-DD” 형식으로 반환 */
export function getDayBeforeYesterday(): string {
    const dby = new Date();
    dby.setDate(dby.getDate() - 2);
    return formatDate(dby);
}

/** Date → “YYYY-MM-DD” */
function formatDate(date: Date): string {
    const yyyy = date.getFullYear().toString();
    const mm = (date.getMonth() + 1).toString().padStart(2, '0');
    const dd = date.getDate().toString().padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}
