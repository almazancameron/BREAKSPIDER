/** Host reflects the browser's target; Next may normalize request.url to localhost. */
export function isSameOriginJson(request: Request): boolean {
    const url = new URL(request.url);
    const host = request.headers.get("host");
    const expectedOrigin = host ? `${url.protocol}//${host}` : url.origin;
    return request.headers.get("origin") === expectedOrigin
        && request.headers.get("content-type")?.split(";")[0] === "application/json";
}
