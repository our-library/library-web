import React, {createRef, useState, useRef, useEffect, forwardRef} from 'react';

export function CategorySelect(props) {
  const {
    defaultValue,
    categoryList,
    setSelectLargeCategoryKey,
    selectLargeCategory,
    setSelectSmallCategoryKey,
    isSubCategory,
    type,
    size
  } = props;
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isOptionActiveIndex, setIsOptionActiveIndex] = useState(0);
  const [selectKeyValue, setSelectKeyValue] = useState(0);
  const [smallCategoryIndex, setSmallCategoryIndex] = useState(0);
  const refs = useRef(Array.from({length: categoryList.length}, () => createRef()));

  useEffect(() => {
    if (selectLargeCategory) {
      findSmallCategoryIndex();
    }
  }, [selectLargeCategory]);

  useEffect(() => {
    setSelectKeyValue(defaultValue);
  }, []);

  function handleSelect(e, index) {
    setIsOptionActiveIndex(index);

    if (!isSubCategory) {
      const categoryKey = categoryList[index].categoryKey;
      const categoryName = categoryList[index].categoryName;
      setSelectKeyValue(categoryName);
      setSelectLargeCategoryKey(categoryKey);
    }
    if (isSubCategory) {
      const categoryName = categoryList[smallCategoryIndex].includedCategories[index].categoryName;
      const categoryKey = categoryList[smallCategoryIndex].includedCategories[index].categoryKey;
      setSelectKeyValue(categoryName);
      setSelectSmallCategoryKey(categoryKey);
    }
    setIsSelectOpen(false);
  }

  function findSmallCategoryIndex() {
    const resultIndex = categoryList.findIndex((list) => list.categoryKey === Number(selectLargeCategory));
    console.log(resultIndex);
    setSmallCategoryIndex(resultIndex);
  }

  return (
    <div
      className={`customSelectWrap-${type} ${size}`}
      style={{marginRight: '8px'}}
    >
      <div
        onClick={() => {
          setIsSelectOpen(!isSelectOpen)
        }}
        className={`select-trigger-${type} ${isSelectOpen && 'open'}`}
      >
        <span>{selectKeyValue}</span>
        <div className="selectArrow"/>
      </div>

      {isSelectOpen && (
        <div className={`customOptionWrap-${type} ${isSelectOpen && 'selectOpenActive'}`}>
          {!isSubCategory ? (
            categoryList.map((list, index) => {
              const {categoryKey, categoryName} = list;
              return (
                <CategoryOption
                  key={categoryKey}
                  value={categoryKey}
                  keyvalue={categoryName}
                  ref={refs.current[index]}
                  onClick={(e) => handleSelect(e, index)}
                  className={`customOption-${type} ${isOptionActiveIndex === index && 'selected'}`}
                />
              )
            })
          ) : (
            selectLargeCategory ? (
              categoryList[smallCategoryIndex].includedCategories.map((list, index) => {
                const {categoryKey, categoryName} = list;
                return (
                  <CategoryOption
                    key={categoryKey}
                    value={categoryKey}
                    keyvalue={categoryName}
                    ref={refs.current[index]}
                    onClick={(e) => handleSelect(e, index)}
                    className={`customOption-${type} ${isOptionActiveIndex === index && 'selected'}`}
                  />
                )
              })
            ) : (
              <span className={`customOption-${type}`}>
                대분류를 선택해 주세요.
              </span>
            )
          )}
        </div>
      )}
    </div>
  )
}

export const CategoryOption = forwardRef((props, ref) => {
  const {value, keyvalue} = props;

  return (
    <span
      ref={ref}
      data-value={value}
      {...props}
    >
      {keyvalue}
    </span>
  )
});


