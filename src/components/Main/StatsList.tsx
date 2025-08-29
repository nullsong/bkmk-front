import { ResponsiveBar } from '@nivo/bar'

const StatsList = ({ data }: any) => {

  return (
    <>
      <div className="relative w-full h-[400px] max-w-[600px] pt-[125px] mx-auto">
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
          axisBottom={{ tickSize: 0, legend: "내 별점 분포", legendOffset: 32 }}
          axisLeft={null}
          colorBy="indexValue"
          colors={{ scheme: 'blues' }}
          margin={{ top: 50, right: 50, bottom: 50, left: 50 }} />
      </div>
    </>
  )
}

export default StatsList;

