import React from 'react';
import * as moment from 'moment';
import Button from '../common/button';
import {Link} from "react-router-dom";
import {ROUTE_PATH} from "../../constants/path";

function SearchResultCard(props) {
  const { list } = props;
  const {
    authors,
    contents,
    datetime,
    publisher,
    thumbnail,
    title,
    translators,
  } = list;
  const {SERVICE_REGISTER_BOOK} = ROUTE_PATH;

  return (
    <div className="searchResultCard">
      <div className="contentSec">
        <div className="bookImg" style={{ backgroundImage: `url(${thumbnail})` }} />
        <div className="contents">
          <h6 className="space-1x">
            <strong>{title}</strong>
          </h6>
          <p className="space-1x">
            {authors} {translators.length >= 1 && ` • 옮긴이 ${translators.join(', ')}`} • {publisher} •{' '}
            {moment(datetime).format('YYYY.MM.DD')}{' '}
          </p>
          <p className="descriptionSec">{contents}</p>
        </div>
      </div>
      <div className="buttonSec">
        <Link to={{
          pathname: SERVICE_REGISTER_BOOK,
          state: {
            list
          }
        }}>
          <Button classType="default" size="sm">
            등록 시작
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default SearchResultCard;
