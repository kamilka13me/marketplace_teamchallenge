import React, { ReactNode } from 'react';

import { Helmet } from 'react-helmet';

const DOMAIN = 'https://marketplace-teamchallenge.vercel.app';
const MAIN_KEYWORDS = '';

const DEFAULT_IMAGE_CARD = '';
const DEFAULT_TITLE = 'Peach Marketplace';
const DEFAULT_DESCRIPTION = 'Де кожен знаходить своє';

const FAVICON_SOURCE = '';

const POSTFIX_TITLE = '';

type PropTypes = {
  title?: string;
  description?: string;
  link: string;
  keywords?: string;
  imageCard?: string;
  largeTwitterCard?: boolean;
  addPostfixTitle?: boolean;
  noIndex?: boolean;
  children?: ReactNode;
};

const ReactHelmet = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  link,
  keywords = '',
  imageCard = DEFAULT_IMAGE_CARD,
  largeTwitterCard = false,
  addPostfixTitle = false,
  noIndex = false,
  children = null,
}: PropTypes) => {
  let metaTitle: string;

  if (addPostfixTitle) {
    metaTitle = title + POSTFIX_TITLE;
  } else {
    metaTitle = title;
  }

  const metaDesc = description ?? DEFAULT_DESCRIPTION;
  const metaLink = DOMAIN + link;

  const metaKeywords = keywords.length ? `${MAIN_KEYWORDS}, ${keywords}` : MAIN_KEYWORDS;

  let metaImageCard: string;

  if (imageCard) {
    if (imageCard.startsWith('https')) {
      metaImageCard = imageCard;
    } else {
      metaImageCard = DOMAIN + imageCard;
    }
  } else {
    metaImageCard = DEFAULT_IMAGE_CARD;
  }

  const metaRobots = noIndex ? 'noindex, nofollow' : 'index, follow';

  const twitterCardType = largeTwitterCard ? 'summary_large_image' : 'summary';

  return (
    <Helmet>
      <html lang="uk" />
      <title>{metaTitle}</title>
      <meta name="description" content={metaDesc} />
      <link rel="canonical" href={metaLink} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="robots" content={metaRobots} />
      <link rel="icon" href={FAVICON_SOURCE} />

      {/* OG Tags */}
      {/* https://ogp.me/ */}
      <meta property="og:url" title={metaLink} />
      <meta property="og:title" title={metaTitle} />
      <meta property="og:description" title={metaDesc} />
      <meta property="og:type" content="..." />
      <meta property="og:image" content={metaImageCard} />

      {/* Twitter tags */}
      {/* https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started */}
      <meta property="twitter:site" title="twitter username of website" />
      <meta property="twitter:title" title={metaTitle} />
      <meta property="twitter:description" title={metaDesc} />
      <meta property="twitter:creator" content="twitter username of webpage content" />
      <meta property="twitter:card" content={twitterCardType} />
      <meta property="twitter:image" content={metaImageCard} />

      <meta name="referrer" content="origin-when-crossorigin" />

      {children}
    </Helmet>
  );
};

export default ReactHelmet;
