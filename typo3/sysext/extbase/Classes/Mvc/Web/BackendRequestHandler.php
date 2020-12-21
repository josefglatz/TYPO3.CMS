<?php

/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

namespace TYPO3\CMS\Extbase\Mvc\Web;

use Psr\Http\Message\ResponseInterface;
use TYPO3\CMS\Core\Core\Environment;
use TYPO3\CMS\Extbase\Mvc\Dispatcher;
use TYPO3\CMS\Extbase\Mvc\Exception\InfiniteLoopException;
use TYPO3\CMS\Extbase\Mvc\RequestHandlerInterface;
use TYPO3\CMS\Extbase\Mvc\RequestInterface;
use TYPO3\CMS\Extbase\Service\EnvironmentService;

/**
 * A request handler which can handle web requests invoked by the backend.
 * @internal only to be used within Extbase, not part of TYPO3 Core API.
 */
class BackendRequestHandler implements RequestHandlerInterface
{
    protected Dispatcher $dispatcher;
    protected EnvironmentService $environmentService;

    public function __construct(
        Dispatcher $dispatcher,
        EnvironmentService $environmentService
    ) {
        $this->dispatcher = $dispatcher;
        $this->environmentService = $environmentService;
    }

    /**
     * Handles the web request. The response will automatically be sent to the client.
     *
     * @param RequestInterface $request
     * @return ResponseInterface
     * @throws InfiniteLoopException
     */
    public function handleRequest(RequestInterface $request)
    {
        return $this->dispatcher->dispatch($request);
    }

    /**
     * This request handler can handle a web request invoked by the backend.
     *
     * @param RequestInterface $request
     * @return bool If we are in backend mode TRUE otherwise FALSE
     */
    public function canHandleRequest(RequestInterface $request)
    {
        return $this->environmentService->isEnvironmentInBackendMode() && !Environment::isCli();
    }

    public function getPriority(): int
    {
        return 100;
    }
}
