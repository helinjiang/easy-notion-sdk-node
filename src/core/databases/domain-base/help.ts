export const getPageIdInUrl = (pageUrl: string): string => {
  // https://www.notion.so/username/page-e2d13cfbbe5a435cbec291f0f8e314aa
  // https://www.notion.so/myworkspace/66fa9039960e44ca95f2981ab2d1d975?v=5df9660ddcb744b9a8e9b475a941e6c7

  return pageUrl.split('?')[0].split('/').pop()?.split('-').pop() || '';
};