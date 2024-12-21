package com.redbox.domain.article.service;

import com.redbox.domain.article.dto.ArticleResponse;
import com.redbox.domain.article.dto.CreateArticleRequest;
import com.redbox.domain.article.entity.Article;
import com.redbox.domain.article.repository.ArticleRepository;
import com.redbox.global.entity.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;

    public PageResponse<ArticleResponse> getArticles(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("createdAt").descending());
        Page<Article> articles = articleRepository.findAll(pageable);

        Page<ArticleResponse> response = articles.map(ArticleResponse::new);
        return new PageResponse<>(response);
    }

    @Transactional
    public void createArticle(CreateArticleRequest request) {
        articleRepository.save(Article.builder()
                // 로그인한 유저의 유저 정보를 담아야 하는데 아직 구현되지 않았으므로 주석
//                .userId()
                .subject(request.getSubject())
                .articleUrl(request.getUrl())
                .source(request.getSource())
                .build());
    }
}
