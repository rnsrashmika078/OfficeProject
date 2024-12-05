import './Message.css';
export default function Message({msgbody})
{
    return(
        <div className="message">
          <div className="message-body">
               <h5>{msgbody}</h5>
          </div>
         
        </div>
    )

}