import { createHash } from 'node:crypto';

export const onRequest: PagesFunction = async ({request, env}) => {
	const url = new URL(request.url);
	const qRaw = url.searchParams.get("q");
	const enc = url.searchParams.get("encoding");
	if (qRaw == null) {
		return new Response(null, {status: 400, statusText: "Invalid query"});
	}
	const q = (enc == "base64") ? atob(qRaw) : qRaw;
	const sha2 = makeSha2Hash(q);
	const r = { sha2: sha2 };
 	return jsonResponse(r);
}

export const makeSha2Hash = (v: string): string => {
	return createHash('sha256').update(v).digest('hex');
}

export const jsonResponse = (value: any, init: ResponseInit = {}) =>
  new Response(JSON.stringify(value), {
    headers: { "Content-Type": "application/json", ...init.headers },
    ...init,
  });
