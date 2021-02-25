import React, {useEffect, useState, useRef} from 'react';
import {useRecoilValue, useSetRecoilState, useRecoilState} from 'recoil';
import FilterOutlined from "@ant-design/icons/lib/icons/FilterOutlined";
import CustomSelect, {CustomOption} from "../common/customSelect";
import {BOOK_SORT, BOOK_SORT_LIST} from "../../constants/bookSort";
import {BOOK_STATUS} from "../../constants/bookStatus";
import Checkbox from "../common/checkbox";
import {bookSortValueAtom, isBookRentAvailableFilterAtom} from "../../store/recoil/bookList";

function BookFilter() {
  const [isOpenFilterDetail, setIsOpenFilterDetail] = useState(false);
  const {CREATE_DESC, RENTAL_DESC, TITLE_ASC} = BOOK_SORT;
  const {AVAILABLE, RENTED, LOST} = BOOK_STATUS;
  const [isRentAvailableChecked, setIsRentAvailableChecked] = useRecoilState(isBookRentAvailableFilterAtom);
  const setSelectSortValue = useSetRecoilState(bookSortValueAtom);

  function handleOptionFilter() {
    setIsRentAvailableChecked(!isRentAvailableChecked)
  }

  // useEffect(() => {
  //   console.log(selectSortValue);
  // },[selectSortValue]);

  return (
    <div>
      <div className="bookFilterIcon">
        <div className="icon" onClick={() => setIsOpenFilterDetail(!isOpenFilterDetail)}>
          <FilterOutlined />
        </div>

        {isOpenFilterDetail && (
          <div className="bookFilterDetailSec">
            <div className="space-2x">
              <p><b>정렬 기준</b></p>
              <CustomSelect
                defaultValue='최신 등록순'
                setSelectValue={setSelectSortValue}
              >
                {BOOK_SORT_LIST.map(sortList => {
                  const { value, keyValue } = sortList;
                  return (
                    <CustomOption
                      key={value}
                      value={value}
                      keyValue={keyValue}
                    />
                  )
                })}
              </CustomSelect>
            </div>

            <p><b>추가 필터</b></p>
            <div>
              <Checkbox
                isChecked={isRentAvailableChecked}
                handleCheckBox={handleOptionFilter}
              >
                대여가능
              </Checkbox>
            </div>
          </div>
        )}

      </div>


    </div>
  )
}

export default BookFilter
