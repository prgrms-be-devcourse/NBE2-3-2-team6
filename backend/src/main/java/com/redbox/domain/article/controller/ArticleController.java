package com.redbox.domain.article.controller;

import com.redbox.domain.article.dto.ArticleResponse;
import com.redbox.domain.article.service.ArticleService;
import com.redbox.domain.common.dto.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;

    @GetMapping("/articles")
    public ResponseEntity<PageResponse<ArticleResponse>> getArticles(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(articleService.getArticles(page, size));
    }
}
