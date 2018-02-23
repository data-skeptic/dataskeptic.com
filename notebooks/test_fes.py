import unittest
import numpy as np
import pandas as pd
import datetime
import fes


class TestFeatureEngineeringSystem(unittest.TestCase):

    def get_mock_data(self):
        mock_d = {'from_user': ['a', 'b', 'b', 'c', 'c', 'd', 'd', 'd', 'd', 'd'],
                  'date': ['2017-12-13', '2017-11-30', '2017-12-03',
                           '2017-11-01', '2017-12-16', '2017-11-11', '2017-12-07', '2017-12-15', '2017-12-26',
                           '2017-12-27'], 'amount':
                      ['700', '15', '30', '2', '10', '50', '100', '125', '355', '900']}

        mock_df = pd.DataFrame(mock_d)
        mock_df['date'] = pd.to_datetime(mock_df['date'])
        mock_df['amount'] = mock_df['amount'].astype(float)
        return mock_df

    def test_window_1(self):
        df = self.get_mock_data()
        result = fes.calculate_feature(1, df)
        self.assertEqual(len(result.columns),1)

    def test_window_2(self):
        df = self.get_mock_data()
        result = fes.calculate_feature(2, df)
        self.assertEqual(len(result.columns),2)

    def test_window_31(self):
        df = self.get_mock_data()
        result = fes.calculate_feature(31, df)
        self.assertEqual(len(result.columns),31)

    def test_segmenting(self):
        arr = np.arange(13)+1
        w = 3
        result = fes.create_sub_segments(w, arr)
        n = len(result)
        n2 = len(arr)
        m = n2 % w
        self.assertEqual(len(result), (len(arr) - m)/3)
        self.assertEqual(sum(result[0]), 1+2+3)
        self.assertEqual(sum(result)), sum(result[0:m])


if __name__ == '__main__':
    unittest.main()