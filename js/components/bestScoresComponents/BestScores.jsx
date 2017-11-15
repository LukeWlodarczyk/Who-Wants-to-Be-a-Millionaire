import React from 'react';


export default class BestScores extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ranking: [],
    }
  }



  componentDidMount(){
    const rankRef = firebase.database().ref('rank');
      rankRef.on('value', snapshot => {
        this.setState({
          ranking: snapshot.val(),
        })
      });
    console.log(typeof this.state.ranking);
  }


    render() {
      const scores = []
      for (let key of Object.keys(this.state.ranking)) {
          scores.push(this.state.ranking[key]);
      }

      const ranking = scores.sort( (a, b) => (b.score === a.score) ? a.totalTime - b.totalTime : b.score - a.score).map( (el, index) => {
        return <tr key={index}>
                <td>{index+1}</td>
                <td>{el.name}</td>
                <td>{el.score}&pound; </td>
                <td>{el.totalTime}sec </td>
                <td>{el.lifelinesUsed}/5</td>
               </tr>
      })

        return <div className='container bestScoreContainer'>

          <table className='bestScoreTable'>
            <thead>
              <tr>
                <td colSpan="5">Best Scores</td>
              </tr>
              <tr>
                <td>Position</td>
                <td>Name</td>
                <td>Score</td>
                <td>Total time</td>
                <td>Lifelines used</td>
              </tr>
            </thead>
            <tbody>
              {ranking}
            </tbody>
          </table>
        </div>
      }
}
