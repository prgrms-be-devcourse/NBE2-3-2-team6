package com.redbox.domain.article.dto;

import com.redbox.domain.article.entity.Article;
import lombok.Getter;

@Getter
public class ArticleResponse {

    private final Long articleNo;
    private final String subject;
    private final String url;
    private final String source;

    public ArticleResponse(Article article) {
        this.articleNo = article.getId();
        this.subject = article.getSubject();
        this.url = article.getArticleUrl();
        this.source = article.getSource();
    }
}
