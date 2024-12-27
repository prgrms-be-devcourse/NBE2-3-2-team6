package com.redbox.domain.article.dto;

import com.redbox.domain.article.entity.Article;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class ArticleResponse {

    private final Long articleNo;
    private final String subject;
    private final String url;
    private final String source;
    private final LocalDate createdDate;

    public ArticleResponse(Article article) {
        this.articleNo = article.getId();
        this.subject = article.getSubject();
        this.url = article.getArticleUrl();
        this.source = article.getSource();
        this.createdDate = article.getCreatedAt().toLocalDate();
    }
}
