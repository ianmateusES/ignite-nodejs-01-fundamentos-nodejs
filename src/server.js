import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extract-query-params.js';

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find(route => {
    return route.method === method && route.path.test(url);
  })

  if(route) {
    const routeParams = req.url.match(route.path);

    const { query, ...params } = routeParams.groups;

    req.params = params;
    req.query = query ? extractQueryParams(query) : {};

    return route.handler(req, res);
  }

  return res.writeHead(404).end();
});

server.listen(3333);

/*
Funções básicas
- Criar usuários
- Listagem de usuários
- Edição de usuários
- Remoção de usuários

HTTP
- Método HTTP
- URL

Métodos HTTP
- GET => Buscar um recurso do back-end
- POST => Criar um recurso no back-end
- PUT => Atualizar um recurso no back-end
- PATCH => Atualizar uma informação especifica de um recurso no back-end
- DELETE => Deletar um recurso do back-end

Tipos de armazenamentos
- Statefull => Armazenamento em memória
- Stateless => Armazenamento persistido em banco de dados

Cabeçalhos (Requisição/resposta) => Metadados


HTTP status code
- 200-299 => Sucesso
- 300-399 => Redirecionado
- 400-499 => Client Erro
- 500-599 => Server Erro

Envio de informações para o servidor
- Query Parameters => Filtros, paginação, não-obrigatórios
  - Exemplo: GET http://localhost:3333/users?name=ian&email=ian%40example.com
- Route Parameters => Identificação de recurso
  - Exemplo: DELETE http://localhost:3333/users/b26c4bf3-018e-4fcd-8faa-5d423af581e4
- Request Body => Envio de informações de um formulário (HTTPs)

*/
