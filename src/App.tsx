import { useState } from 'react'
import { Box } from '@chakra-ui/react';
import './App.css'
import PrintFlights from './service/printFlights';
import FlightSearchForm from './service/flightSearchForm';
import PaginationControl from './service/paginationControl';

export interface FlightResult {
  id: number;
  departureAirport: string;
  departureTime: string;
  arrivalAirport: string;
  arrivalTime: string;
  flight: string;
  price: number;
  availableSeats: number;
  status: number;
}

function App() {
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [results, setResults] = useState<FlightResult[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = () => {
    // 在此處理搜尋邏輯，例如發送 API 請求
    // console.log(`查詢從 ${departure} 到 ${destination} 的班機`);
    const fetchedResults: FlightResult[] = [
      { id: 1, departureAirport: '台北桃園國際機場', departureTime: '08:00', arrivalAirport: '東京羽田機場', arrivalTime: '10:00', flight: '航班 A123', price: 3888, availableSeats: 8, status: 1 },
      { id: 2, departureAirport: '台北桃園國際機場', departureTime: '09:30', arrivalAirport: '東京羽田機場', arrivalTime: '11:30', flight: '航班 B456', price: 5888, availableSeats: 18, status: 1 },
      { id: 3, departureAirport: '台北桃園國際機場', departureTime: '10:00', arrivalAirport: '東京羽田機場', arrivalTime: '12:00', flight: '航班 C123', price: 7888, availableSeats: 28, status: 1 },
      { id: 4, departureAirport: '台北桃園國際機場', departureTime: '11:15', arrivalAirport: '東京羽田機場', arrivalTime: '13:15', flight: '航班 D456', price: 9888, availableSeats: 38, status: 1 },
      { id: 5, departureAirport: '台北桃園國際機場', departureTime: '11:40', arrivalAirport: '東京羽田機場', arrivalTime: '13:40', flight: '航班 E123', price: 6888, availableSeats: 58, status: 1 },
      { id: 6, departureAirport: '台北桃園國際機場', departureTime: '12:10', arrivalAirport: '東京羽田機場', arrivalTime: '14:10', flight: '航班 F456', price: 8888, availableSeats: 68, status: 1 },
      { id: 7, departureAirport: '台北桃園國際機場', departureTime: '12:50', arrivalAirport: '東京羽田機場', arrivalTime: '14:50', flight: '航班 G123', price: 9457, availableSeats: 78, status: 1 },
      { id: 8, departureAirport: '台北桃園國際機場', departureTime: '13:05', arrivalAirport: '東京羽田機場', arrivalTime: '15:05', flight: '航班 H456', price: 8857, availableSeats: 88, status: 1 },
      { id: 9, departureAirport: '台北桃園國際機場', departureTime: '13:40', arrivalAirport: '東京羽田機場', arrivalTime: '15:40', flight: '航班 I123', price: 5277, availableSeats: 7, status: 1 },
      { id: 10, departureAirport: '台北桃園國際機場', departureTime: '14:30', arrivalAirport: '東京羽田機場', arrivalTime: '16:30', flight: '航班 J456', price: 7788, availableSeats: 27, status: 1 },
      { id: 11, departureAirport: '台北桃園國際機場', departureTime: '17:00', arrivalAirport: '東京羽田機場', arrivalTime: '19:00', flight: '航班 K123', price: 6868, availableSeats: 57, status: 1 },
      { id: 12, departureAirport: '台北桃園國際機場', departureTime: '17:55', arrivalAirport: '東京羽田機場', arrivalTime: '19:55', flight: '航班 L456', price: 9427, availableSeats: 87, status: 1 },
    ];
    setResults(fetchedResults);
    setCurrentPage(1);
  };

  const airports = [
    { value: "PEK", label: "北京首都國際機場 (PEK)" },
    { value: "PVG", label: "上海浦東國際機場 (PVG)" },
    { value: "HND", label: "東京羽田機場 (HND)" },
    { value: "ICN", label: "首爾仁川國際機場 (ICN)" },
    { value: "SIN", label: "新加坡樟宜機場 (SIN)" },
    { value: "BKK", label: "曼谷素萬那普國際機場 (BKK)" },
    { value: "KUL", label: "吉隆坡國際機場 (KUL)" },
    { value: "DEL", label: "德里英迪拉·甘地國際機場 (DEL)" },
    { value: "MNL", label: "馬尼拉尼諾伊·阿基諾國際機場 (MNL)" },
    { value: "CGK", label: "雅加達蘇加諾-哈達國際機場 (CGK)" },
    { value: "HKG", label: "香港國際機場 (HKG)" },
    { value: "TPE", label: "台北桃園國際機場 (TPE)" },
    { value: "KHH", label: "高雄國際機場 (KHH)" },
    { value: "NRT", label: "東京成田國際機場 (NRT)" },
    { value: "KIX", label: "大阪關西國際機場 (KIX)" },
    { value: "CTS", label: "札幌新千歲機場 (CTS)" },
    { value: "FUK", label: "福岡機場 (FUK)" },
    { value: "OKA", label: "沖繩那霸機場 (OKA)" },
    { value: "CAN", label: "廣州白雲國際機場 (CAN)" },
    { value: "SZX", label: "深圳寶安國際機場 (SZX)" },
    { value: "XIY", label: "西安咸陽國際機場 (XIY)" },
    { value: "CTU", label: "成都雙流國際機場 (CTU)" },
    { value: "CKG", label: "重慶江北國際機場 (CKG)" },
    { value: "SYD", label: "悉尼金斯福德·史密斯機場 (SYD)" },
    { value: "MEL", label: "墨爾本圖拉馬林機場 (MEL)" },
    { value: "BNE", label: "布里斯班機場 (BNE)" },
    { value: "PER", label: "珀斯機場 (PER)" },
    { value: "AKL", label: "奧克蘭國際機場 (AKL)" },
    { value: "WLG", label: "威靈頓國際機場 (WLG)" },
    { value: "CHC", label: "基督城國際機場 (CHC)" },
  ];

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentResults = results.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(results.length / itemsPerPage);

  const handlePageChange = (value: string) => {
    const page = parseInt(value) || 1; // 確保頁碼是數字，預設為 1
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <Box w="100%" maxW="1200px" mx="auto" mt={5} p={10} borderWidth={1} borderRadius="md">
      <FlightSearchForm
        departure={departure}
        setDeparture={setDeparture}
        destination={destination}
        setDestination={setDestination}
        date={date}
        setDate={setDate}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        handleSearch={handleSearch}
        airports={airports}
      />

      <PrintFlights results={results} />

      <PaginationControl 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
      />
    </Box>
  );
}

export default App
