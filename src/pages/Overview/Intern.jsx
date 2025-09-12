import React from 'react'
import OverviewComp from '../../components/Overview'
import total from '../../../public/OverViewImg/Total.png'
import revenue from '../../../public/OverViewImg/revenue.png'
import pending from '../../../public/OverViewImg/pending.png'
import Credit from '../../../public/OverViewImg/Credit.png'
import Payment from '../../components/Payment'
import AnnouncementsOverView from '../../components/AnnouncementsOverView'


export default function Intern() {
  return (
    <div>
 <div className='p-2 gap-20 grid grid-cols-4 '>

                <OverviewComp title="Total Target" revenue="Rs 1,00,000" img={total} className=""></OverviewComp> 
                <OverviewComp title="Projected Revenue" revenue="Rs 1,00,000" img={total} className=""></OverviewComp> 
                <OverviewComp title="Revenue Credited " revenue="Rs 1,00,000" img={Credit} className=""></OverviewComp> 
                <OverviewComp title="Pending Revenue" revenue="Rs 1,00,000" img={pending} className=""></OverviewComp> 


        
    </div>
    <div className='flex p-2 gap-2' >
        <div className=''>
            
                                <OverviewComp title="Pending Revenue" revenue="Rs 1,00,000" img={pending} className=""></OverviewComp> 
        <Payment></Payment>

        </div>
        <div className='w-screen'>
            <AnnouncementsOverView></AnnouncementsOverView>

        </div>

    </div>
    </div>
   
  )
}
