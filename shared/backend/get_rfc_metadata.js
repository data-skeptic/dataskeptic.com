module.exports = {
  get_rfc_metadata: function(req, res, my_cache) {
  	var topic = "Do you think Tensor Processing Units (TPUs) will totally replace GPUs for deep learning?"
  	var description = "Deep learning requires GPUs to achieve good results in a reasonable amount of time on many problems.  Presently, it seems unclear whether or not specialized hardware will provide an advantage for general cases.  Google has created the TPU.  Either it or something like it will eventually be available on the market.  At that time, will these eventually sunset GPUs for use in deep learning?"
  	var deadline = new Date(2017, 3, 1, 7, 0, 0)
  	var rfc = {topic, description, deadline}
  	return res.status(200).end(JSON.stringify(rfc))
  }
}