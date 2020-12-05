import fetcher from "./fetcher"

export const getBarCodesScanned = async (mobileId) => {
  return await fetcher(`?mobile_id=${mobileId}`)
}

export const postBarCodesScanned = async (body) => {
  return await fetcher("", "POST", body)
}
