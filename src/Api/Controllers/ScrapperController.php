<?php

namespace Datlechin\LinkPreview\Api\Controllers;

use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface;
use spekulatius\phpscraper;
use GuzzleHttp\Client;

class ScrapperController implements RequestHandlerInterface
{
    protected $web;

    public function __construct(phpscraper $web)
    {
        $this->web = $web;
    }

    /*
     * @param Request $request
     * @return Response
     */
    public function handle(Request $request): Response
    {
        $url = isset($request->getQueryParams()['url']) ? $request->getQueryParams()['url'] : '';
        $domain = parse_url($url, PHP_URL_HOST);

        if (filter_var($url, FILTER_VALIDATE_URL) === false || gethostbyname($domain) === $domain) {
            return new JsonResponse([
                'error' => 'Invalid URL',
            ]);
        }

        // check if the content-type contains "text/html"
        $client = new Client();
        try {
            $contentType = $client->head($url)->getHeaderLine('content-type');
            if (strpos($contentType, "text/html") === false) {
                return new JsonResponse([
                    'content_type' => $contentType,
                    'site_name' => null,
                    'title' => null,
                    'description' =>  null,
                    'image' => null,
                ]);
            }
        } catch (\Exception $e) {
            // Some websites do not handle head requests correctly :(
        }

        $this->web->go($url);

        return new JsonResponse([
            'content_type' => $contentType,
            'site_name' => $this->web->openGraph['og:site_name'] ?? null,
            'title' => $this->web->title ?? $this->web->openGraph['og:title'] ?? null,
            'description' => $this->web->description ?? $this->web->openGraph['og:description'] ?? null,
            'image' => $this->web->image ?? $this->web->openGraph['og:image'] ?? null,
        ]);
    }
}
