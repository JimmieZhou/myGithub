/*
 * @Descripttion: 页面b
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-10-14 11:34:26
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-10-14 14:15:05
 */
import Comp from '../components/Comp'
import { withRouter } from 'next/router'
const B = ({ router, name }) => {
    return (
        <Comp>
            <div>page-B</div>
            <div>param:{router.query.id}</div>
            <div>data:{name}</div>
        </Comp>
    );
};

B.getInitialProps = () => {
    return {
        name: 'jimmie'
    }
}

export default withRouter(B)