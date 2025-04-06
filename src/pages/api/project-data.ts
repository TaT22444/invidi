// import type { APIRoute } from 'astro';
// import { getProjectData } from '../../services/projectService';

// export const GET: APIRoute = async ({ request, params }) => {
//   const url = new URL(request.url);
//   const projectId = url.searchParams.get('projectId');
//   const token = request.headers.get('Cookie')?.match(/token=([^;]+)/)?.[1] || '';
  
//   if (!projectId) {
//     return new Response(
//       JSON.stringify({ error: 'projectId is required' }),
//       { status: 400, headers: { 'Content-Type': 'application/json' } }
//     );
//   }
  
//   const data = await getProjectData(projectId, token);
  
//   return new Response(
//     JSON.stringify(data),
//     { 
//       status: data.error ? 400 : 200, 
//       headers: { 'Content-Type': 'application/json' }
//     }
//   );
// }; 