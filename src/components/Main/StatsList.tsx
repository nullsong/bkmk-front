import { ResponsiveBar } from '@nivo/bar'
import _ from 'lodash';
const StatsList = ({ data }: { data: { reviewRating: string; count: number }[] }) => {

  // 개수
  const totalCount = _.sumBy(data, "count");

  // 평균
  const totalScore = _.sumBy(data, (d: { reviewRating: string; count: number }) => parseInt(d.reviewRating) * d.count);
  const avg = totalCount > 0 ? (totalScore / totalCount).toFixed(1) : "0.0";

  // 많이 준 별점 
  const max = _.maxBy(data, "count");

  return (
    <>
      <div className="relative w-full h-[700px] max-w-[500px] pt-[125px] mx-auto flex flex-col">
        <div className='max-w-[600px] pt-[50px] font-bold text-[20px] ml-[20px]'>별점 분포</div>
        <div className="w-full h-[300px]">
          <ResponsiveBar
            data={data}
            keys={['count']}
            indexBy="reviewRating"
            enableGridY={false}
            labelPosition="end"
            labelOffset={10}
            labelSkipWidth={12}
            labelSkipHeight={12}
            isInteractive={false}
            axisBottom={{ tickSize: 0 }}
            axisLeft={null}
            colorBy="indexValue"
            colors={{ scheme: 'blues' }}
            margin={{ top: 80, right: 20, bottom: 50, left: 20 }}
          />

        </div>
        <div className="flex flex-row justify-around mt-5">
          <div className='flex-col text-center'>
            <div className='font-bold text-[17px] mb-1'>{avg}</div>
            <div>별점 평균</div>
          </div>
          <div className='flex-col text-center'>
            <div className='font-bold text-[17px] mb-1'>{totalCount}</div>
            <div>별점 개수</div>
          </div>
          <div className='flex-col text-center'>
            <div className='font-bold text-[17px] mb-1'>{max?.reviewRating}</div>
            <div>많이 준 별점</div>
          </div>
        </div>
      </div >

    </>
  )
}

export default StatsList;

