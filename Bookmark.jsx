import {React,useEffect,useState} from 'react'
import './Bookmark.css';


function Bookmark() {
  const [bookmarkName, setBookMarkName] = useState('');
  const [url, setUrl] = useState('');
  const [bookmarkList, setBookMarkList] = useState([]);
  const [loaded, setLoaded] = useState(false);


  // const isValidUrl=(str)=>{
  //   return str.startsWith("http://") || str.startsWith("https://");
  // };

  const formatUrl = (str) => {
    if(str.startsWith("http://") || str.startsWith("https://")){
      return str;
    }
    return `https://${str}`;
  };
  const addBookmark = () =>{
    if(bookmarkName.trim()!=='' && url.trim()!=='') {
      // if (!isValidUrl(url.trim())) {
      //   alert("Please enter a valid URL starting with https://");
      //   return;
      // }

      const formattedUrl = formatUrl(url.trim());
      setBookMarkList(prev=>([...prev,{text:bookmarkName, loc:formattedUrl}]));
      setBookMarkName('');
      setUrl('');
    }
  };

  const handleVisit = (index) => {
    const link = bookmarkList[index].loc;
    if(link) {
      window.open(link, "_blank");
    }
  };
  const handleDelete = (deleteIndex) => {
    const newList = bookmarkList.filter((_,index)=>index!==deleteIndex);
    setBookMarkList(newList);
  }

  useEffect(()=>{
    const saved = localStorage.getItem("bookList");
    if (saved) setBookMarkList(JSON.parse(saved));
    setLoaded(true);
  },[]);

  useEffect(()=>{
    if(loaded) {
      localStorage.setItem("bookList", JSON.stringify(bookmarkList));
    }
  },[bookmarkList, loaded]);


  return (
    <div className="main">
      <h1>Bookmark Manager</h1>
      <input 
        type="text" 
        placeholder="Bookmark Name"
        value={bookmarkName}
        onChange={(e)=>setBookMarkName(e.target.value)}
      />

      <div className="url-container">
          <input 
          type="url" 
          placeholder="Url (https://...)"
          value={url}
          onChange={(e)=>setUrl(e.target.value)}
        />
        <button onClick={addBookmark}>Add</button>
      </div>

      <div className="list-container">
        <ul>
          {bookmarkList.map((item, index)=> (
            <li key={index}>
              <span>
                <span>📌</span>
                <span>{item.text}</span>
              </span>
              <div className="btn-container">
                <button onClick={()=>handleVisit(index)}>Visit</button>
                <button onClick={()=>handleDelete(index)}>Delete</button>
              </div>
            
            
            </li>

          ))}
        </ul>
      </div>
      


    </div>
  )
}

export default Bookmark
