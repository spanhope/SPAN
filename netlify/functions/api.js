exports.handler = async (event, context) => {
    const path = event.path.replace(/\/.netlify\/functions\/api/, '');
    
    const routes = {
        '/api/health': { status: 200, body: { status: 'ok', message: 'SPAN API running' } },
        '/api/stats': { status: 200, body: [{ key: 'people_helped', value: 98520 }, { key: 'volunteers_trained', value: 306 }, { key: 'peer_counsellors', value: 84 }, { key: 'workshops_held', value: 1369 }] },
        '/api/posts': { status: 200, body: { data: [], total: 0, page: 1, limit: 10, totalPages: 0 } },
        '/api/testimonials': { status: 200, body: [] },
        '/api/gallery': { status: 200, body: [] },
        '/api/categories': { status: 200, body: [] },
        '/api/categories/blog': { status: 200, body: [] },
        '/api/categories/gallery': { status: 200, body: [] },
    };
    
    const route = routes[path];
    if (route) {
        return {
            statusCode: route.status,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(route.body)
        };
    }
    
    return { statusCode: 404, body: 'Not Found' };
};