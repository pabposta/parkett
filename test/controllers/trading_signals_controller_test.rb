require 'test_helper'

class TradingSignalsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get trading_signals_create_url
    assert_response :success
  end

end
