/**
 * 热门文章列表哈希缓存
 * hash key => hotArticleId => {read : number; like : number; hot:number;favorite:number}
 * hash key = hot_article_hash
 */

/**
 * 用户评论点赞id哈希缓存
 * hash key => userUId => json(articleId=>[已点赞评论id])
 * hash key = user_article_like_comment_hash
 */
